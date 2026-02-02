import {
  Component, OnInit, OnDestroy, AfterViewInit,
  ViewChild, ElementRef, Input, Output, EventEmitter
} from '@angular/core';
import SignaturePad from 'signature_pad';
import { SignaturePadConfig, DEFAULT_SIGNATURE_PAD_CONFIG } from '../../models/signature/signature.model';

@Component({
  selector: 'app-signature-pad-draw',
  templateUrl: './signature-pad-draw.component.html',
  styleUrls: ['./signature-pad-draw.component.css']
})
export class SignaturePadDrawComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('signatureCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() config: SignaturePadConfig = DEFAULT_SIGNATURE_PAD_CONFIG;
  @Output() signatureChange = new EventEmitter<string | null>();

  private signaturePad!: SignaturePad;
  private resizeObserver!: ResizeObserver;
  strokeCount = 0;
  isEmpty = true;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initCanvas();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const ratio = window.devicePixelRatio || 1;
    const container = canvas.parentElement;
    const width = container ? container.clientWidth : (this.config.width || 600);
    const height = this.config.height || 200;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(ratio, ratio);
    }

    this.signaturePad = new SignaturePad(canvas, {
      penColor: this.config.penColor || '#000033',
      backgroundColor: this.config.backgroundColor || 'rgba(0,0,0,0)',
      minWidth: this.config.minWidth || 0.5,
      maxWidth: this.config.maxWidth || 2.5
    });

    this.signaturePad.addEventListener('endStroke', () => {
      this.strokeCount++;
      this.isEmpty = this.signaturePad.isEmpty();
      this.emitSignature();
    });

    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
    });
    if (container) {
      this.resizeObserver.observe(container);
    }
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement;
    if (!container) return;

    const data = this.signaturePad.toData();
    const ratio = window.devicePixelRatio || 1;
    const width = container.clientWidth;
    const height = this.config.height || 200;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(ratio, ratio);
    }

    this.signaturePad.clear();
    this.signaturePad.fromData(data);
  }

  private emitSignature(): void {
    if (this.signaturePad.isEmpty()) {
      this.signatureChange.emit(null);
    } else {
      const dataUrl = this.trimCanvas();
      this.signatureChange.emit(dataUrl);
    }
  }

  private trimCanvas(): string {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return this.signaturePad.toDataURL('image/png');

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = pixels;
    let top = height, bottom = 0, left = width, right = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = data[(y * width + x) * 4 + 3];
        if (alpha > 0) {
          if (y < top) top = y;
          if (y > bottom) bottom = y;
          if (x < left) left = x;
          if (x > right) right = x;
        }
      }
    }

    if (top >= bottom || left >= right) {
      return this.signaturePad.toDataURL('image/png');
    }

    const padding = 10;
    top = Math.max(0, top - padding);
    left = Math.max(0, left - padding);
    bottom = Math.min(height - 1, bottom + padding);
    right = Math.min(width - 1, right + padding);

    const trimmedWidth = right - left + 1;
    const trimmedHeight = bottom - top + 1;
    const trimmed = ctx.getImageData(left, top, trimmedWidth, trimmedHeight);

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = trimmedWidth;
    tempCanvas.height = trimmedHeight;
    const tempCtx = tempCanvas.getContext('2d');
    if (tempCtx) {
      tempCtx.putImageData(trimmed, 0, 0);
    }
    return tempCanvas.toDataURL('image/png');
  }

  undo(): void {
    const data = this.signaturePad.toData();
    if (data.length > 0) {
      data.pop();
      this.signaturePad.fromData(data);
      this.strokeCount = Math.max(0, this.strokeCount - 1);
      this.isEmpty = this.signaturePad.isEmpty();
      this.emitSignature();
    }
  }

  clear(): void {
    this.signaturePad.clear();
    this.strokeCount = 0;
    this.isEmpty = true;
    this.signatureChange.emit(null);
  }

  getStrokeCount(): number {
    return this.strokeCount;
  }

  getCanvasDimensions(): { width: number; height: number } {
    const canvas = this.canvasRef.nativeElement;
    return { width: canvas.width, height: canvas.height };
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.signaturePad) {
      this.signaturePad.off();
    }
  }
}
