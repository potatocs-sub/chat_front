import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DndDirective } from '../../directives/dnd.directive';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-add-doc',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, DndDirective, RouterModule],
  templateUrl: './add-doc.component.html',
  styleUrl: './add-doc.component.scss'
})
export class AddDocComponent {
  // on file drop handler
  onFileDropped($event: any) {
    console.log($event)
  }

  // handle file from browsing
  fileBrowseHandler(target: any) {
    console.log(target.files)
  }
}
