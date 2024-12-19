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
    waiting: boolean = false;

    constructor(private chatService: ChatService) { }


    submit() {
        // 이미 요청 중이라면 실행하지 않음
        if (this.waiting) return;

        this.waiting = true; // 요청 대기 상태로 설정

        // chatService를 통해 질문, 히스토리, 회사 정보를 서버에 전달
        this.chatService.ask(this.qustion, this.history, this.company).subscribe((res: any) => {
            // 응답이 성공적일 경우
            if (res.status) {
                // 응답 내용을 히스토리에 추가 (답변 형태)
                this.history.push('<article class="answer">' + res.answer.kwargs.content + '</article>');
            }
            this.waiting = false; // 요청 완료 상태로 설정
        });

        // 사용자가 입력한 질문을 히스토리에 추가 (질문 형태)
        this.history.push('<article class="question">' + this.qustion + '</article>');
        this.qustion = ''; // 입력 필드 초기화
    }

}
