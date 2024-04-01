import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DndDirective } from '../../directives/dnd.directive';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
@Component({
  selector: 'app-add-doc',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, DndDirective, RouterModule, FormsModule],
  templateUrl: './add-doc.component.html',
  styleUrl: './add-doc.component.scss'
})
export class AddDocComponent {
  company: string = '';
  files: any[] = [];

  constructor(private chatService: ChatService) {

  }

  // on file drop handler
  onFileDropped($event: any) {
    // console.log($event)
    this.prepareFileList($event)

  }

  // handle file from browsing
  fileBrowseHandler(target: any) {
    // console.log(target.files)
    this.prepareFileList(target.files)
  }

  // delete file from files list
  deleteFile(index: number) {
    this.files.splice(index, 1)
  }

  // submit file and company name
  submit() {
    console.log(this.company, this.files)

    this.chatService.addDocs(this.company, this.files).subscribe((res) => {
      console.log(res);
    })
  }


  // prepare file list
  prepareFileList(files: Array<any>) {
    for (const item of files) {
      item.pogress = 0;
      this.files.push(item);
    }
  }

  // format bytes
  formatBytes(bytes: any, decimals: any = 0) {
    if (bytes == 0) {
      return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
