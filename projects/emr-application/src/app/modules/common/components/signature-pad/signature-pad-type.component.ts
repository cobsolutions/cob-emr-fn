import {
  Component, OnInit, ViewChild, ElementRef,
  Input, Output, EventEmitter
} from '@angular/core';
import { SignaturePadConfig, DEFAULT_SIGNATURE_PAD_CONFIG } from '../../models/signature/signature.model';

interface SignatureFont {
  name: string;
  family: string;
  cssImport: string;
}

@Component({
  selector: 'app-signature-pad-type',
  templateUrl: './signature-pad-type.component.html',
  styleUrls: ['./signature-pad-type.component.css']
})
export class SignaturePadTypeComponent implements OnInit {
  @ViewChild('typeCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() config: SignaturePadConfig = DEFAULT_SIGNATURE_PAD_CONFIG;
  @Output() signatureChange = new EventEmitter<string | null>();

  signatureText = '';
  selectedFontIndex = 0;
  fontsLoaded = false;

  fonts: SignatureFont[] = [
    { name: 'Dancing Script', family: 'Dancing Script, cursive', cssImport: 'Dancing+Script:wght@700' },
    { name: 'Great Vibes', family: 'Great Vibes, cursive', cssImport: 'Great+Vibes' },
    { name: 'Pacifico', family: 'Pacifico, cursive', cssImport: 'Pacifico' },
    { name: 'Caveat', family: 'Caveat, cursive', cssImport: 'Caveat:wght@700' }
  ];

  ngOnInit(): void {
    this.loadFonts();
  }

  private loadFonts(): void {
    const families = this.fonts.map(f => f.cssImport).join('&family=');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
    document.head.appendChild(link);

    link.onload = () => {
      this.fontsLoaded = true;
      if (this.signatureText) {
        this.renderSignature();
      }
    };
  }

  onTextChange(value: string): void {
    this.signatureText = value;
    if (!value.trim()) {
      this.signatureChange.emit(null);
      this.clearCanvas();
      return;
    }
    this.renderSignature();
  }

  selectFont(index: number): void {
    this.selectedFontIndex = index;
    if (this.signatureText.trim()) {
      this.renderSignature();
    }
  }

  private renderSignature(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ratio = window.devicePixelRatio || 1;
    const container = canvas.parentElement;
    const width = container ? container.clientWidth : (this.config.width || 600);
    const height = this.config.height || 200;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(ratio, ratio);

    ctx.clearRect(0, 0, width, height);

    const font = this.fonts[this.selectedFontIndex];
    let fontSize = 48;
    ctx.font = `${fontSize}px ${font.family}`;

    // Scale font to fit canvas width with padding
    const maxWidth = width - 40;
    let textWidth = ctx.measureText(this.signatureText).width;
    if (textWidth > maxWidth) {
      fontSize = Math.floor(fontSize * (maxWidth / textWidth));
      ctx.font = `${fontSize}px ${font.family}`;
    }

    ctx.fillStyle = this.config.penColor || '#000033';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.signatureText, width / 2, height / 2);

    const dataUrl = canvas.toDataURL('image/png');
    this.signatureChange.emit(dataUrl);
  }

  private clearCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  getSelectedFontFamily(): string {
    return this.fonts[this.selectedFontIndex].family;
  }

  clear(): void {
    this.signatureText = '';
    this.clearCanvas();
    this.signatureChange.emit(null);
  }
}
