import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SignaturePadConfig, DEFAULT_SIGNATURE_PAD_CONFIG } from '../../models/signature/signature.model';

@Component({
  selector: 'app-signature-pad-upload',
  templateUrl: './signature-pad-upload.component.html',
  styleUrls: ['./signature-pad-upload.component.css']
})
export class SignaturePadUploadComponent {
  @Input() config: SignaturePadConfig = DEFAULT_SIGNATURE_PAD_CONFIG;
  @Output() signatureChange = new EventEmitter<string | null>();
  @Output() fileInfoChange = new EventEmitter<{ fileName: string; fileSize: number } | null>();

  previewUrl: string | null = null;
  errorMessage: string | null = null;
  isDragOver = false;
  fileName: string | null = null;
  fileSize = 0;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  private processFile(file: File): void {
    this.errorMessage = null;
    const allowedTypes = this.config.allowedFileTypes || DEFAULT_SIGNATURE_PAD_CONFIG.allowedFileTypes!;
    if (!allowedTypes.includes(file.type)) {
      this.errorMessage = `Invalid file type. Allowed: ${allowedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')}`;
      return;
    }

    const maxSizeBytes = (this.config.maxUploadSizeMB || DEFAULT_SIGNATURE_PAD_CONFIG.maxUploadSizeMB!) * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      this.errorMessage = `File too large. Maximum size: ${this.config.maxUploadSizeMB || DEFAULT_SIGNATURE_PAD_CONFIG.maxUploadSizeMB}MB`;
      return;
    }

    this.fileName = file.name;
    this.fileSize = file.size;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result as string;
      this.previewUrl = result;
      this.signatureChange.emit(result);
      this.fileInfoChange.emit({ fileName: this.fileName!, fileSize: this.fileSize });
    };
    reader.readAsDataURL(file);
  }

  clear(): void {
    this.previewUrl = null;
    this.fileName = null;
    this.fileSize = 0;
    this.errorMessage = null;
    this.signatureChange.emit(null);
    this.fileInfoChange.emit(null);
  }
}
