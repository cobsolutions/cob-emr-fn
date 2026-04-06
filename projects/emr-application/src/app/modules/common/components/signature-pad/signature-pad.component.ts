import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SignatureCaptureMethod } from '../../models/signature/signature-capture-method.enum';
import { SignatureOutput, SignaturePadConfig, DEFAULT_SIGNATURE_PAD_CONFIG } from '../../models/signature/signature.model';
import { SignatureMetadataService } from '../../service/signature/signature-metadata.service';
import { SignaturePadDrawComponent } from './signature-pad-draw.component';
import { SignaturePadTypeComponent } from './signature-pad-type.component';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.css']
})
export class SignaturePadComponent {
  @ViewChild(SignaturePadDrawComponent) drawComponent?: SignaturePadDrawComponent;
  @ViewChild(SignaturePadTypeComponent) typeComponent?: SignaturePadTypeComponent;
  @Input() config: SignaturePadConfig = DEFAULT_SIGNATURE_PAD_CONFIG;
  @Output() signatureOutput = new EventEmitter<SignatureOutput | null>();

  activeTab: SignatureCaptureMethod = SignatureCaptureMethod.DRAW;
  currentDataUrl: string | null = null;
  uploadFileInfo: { fileName: string; fileSize: number } | null = null;

  readonly CaptureMethod = SignatureCaptureMethod;

  constructor(private metadataService: SignatureMetadataService) {}

  setActiveTab(method: SignatureCaptureMethod): void {
    this.activeTab = method;
    this.currentDataUrl = null;
    this.uploadFileInfo = null;
    this.signatureOutput.emit(null);
  }

  onDrawChange(dataUrl: string | null): void {
    this.currentDataUrl = dataUrl;
    this.emitOutput();
  }

  onUploadChange(dataUrl: string | null): void {
    this.currentDataUrl = dataUrl;
    this.emitOutput();
  }

  onUploadFileInfo(info: { fileName: string; fileSize: number } | null): void {
    this.uploadFileInfo = info;
  }

  onTypeChange(dataUrl: string | null): void {
    this.currentDataUrl = dataUrl;
    this.emitOutput();
  }

  private emitOutput(): void {
    if (!this.currentDataUrl) {
      this.signatureOutput.emit(null);
      return;
    }

    const extras: any = {};
    if (this.activeTab === SignatureCaptureMethod.DRAW && this.drawComponent) {
      extras.strokeCount = this.drawComponent.getStrokeCount();
      const dims = this.drawComponent.getCanvasDimensions();
      extras.canvasWidth = dims.width;
      extras.canvasHeight = dims.height;
    } else if (this.activeTab === SignatureCaptureMethod.UPLOAD && this.uploadFileInfo) {
      extras.fileName = this.uploadFileInfo.fileName;
      extras.fileSize = this.uploadFileInfo.fileSize;
    } else if (this.activeTab === SignatureCaptureMethod.TYPE && this.typeComponent) {
      extras.fontFamily = this.typeComponent.getSelectedFontFamily();
    }

    const metadata = this.metadataService.buildMetadata(
      this.currentDataUrl,
      this.activeTab,
      extras
    );

    this.signatureOutput.emit({
      dataUrl: this.currentDataUrl,
      metadata
    });
  }

  get hasSignature(): boolean {
    return !!this.currentDataUrl;
  }
}
