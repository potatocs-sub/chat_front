import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  //https://stackoverflow.com/questions/44210786/style-not-working-for-innerhtml-in-angular
  encapsulation: ViewEncapsulation.None,
})
export class ChatComponent {
  history: Array<any> = []; // 대화 내역 저장용 
  qustion: string = ''; // 질문 
  company: string = 'nsmarts'; // 회사 

  constructor(private chatService: ChatService) { }


  /**
   * 질문용 함수 
   */
  submit() {
    this.chatService.ask(this.qustion, this.history, this.company).subscribe((res: any) => {
      if (res.status) {
        this.history.push('<article class="answer">' + res.answer.kwargs.content + '</article>')
      }
    })
    this.history.push('<article class="question">' + this.qustion + '</article>');
    this.qustion = '';
  }
}
