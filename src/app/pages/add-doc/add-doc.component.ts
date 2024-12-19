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


    // 파일 드롭 이벤트 핸들러
    onFileDropped($event: any) {
        // console.log($event) // 이벤트 객체 출력 (디버깅 용도)
        this.prepareFileList($event) // 드롭된 파일 목록을 준비
    }

    // 파일 탐색을 통해 선택한 파일 처리
    fileBrowseHandler(target: any) {
        // console.log(target.files) // 선택한 파일 목록 출력 (디버깅 용도)
        this.prepareFileList(target.files) // 선택한 파일 목록을 준비
    }


    // 파일 목록에서 파일 삭제
    deleteFile(index: number) {
        this.files.splice(index, 1) // 주어진 인덱스의 파일을 삭제
    }

    // 파일과 회사 이름 제출
    submit() {
        console.log(this.company, this.files) // 회사 이름과 파일 목록 출력 (디버깅 용도)

        // ChatService를 통해 파일과 회사 이름을 서버에 제출
        this.chatService.addDocs(this.company, this.files).subscribe((res) => {
            console.log(res); // 서버 응답 출력
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
