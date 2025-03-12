import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-iframe-modal',
  templateUrl: './iframe-modal.component.html',
  styleUrl: './iframe-modal.component.css',
  encapsulation: ViewEncapsulation.None
  })
export class IframeModalComponent {

  safeUrl: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<IframeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { iframeUrl: string }) {

    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.iframeUrl);
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
