import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // 문서 등록 함수
    addDocs(company: string, files: File[]) {
        // FormData 객체 생성
        let formdata: FormData = new FormData();
        // 회사 이름과 파일 목록을 콘솔에 출력
        // console.log(company, files);

        // 파일 배열을 반복하며 FormData에 파일 추가
        for (let file of files) {
            formdata.append('files', file, file.name);
        }

        // FormData 내용을 콘솔에 출력
        // console.log(formdata);
        // 회사 이름을 FormData에 추가
        formdata!.append('company', company);

        // HTTP POST 요청을 보내고 결과 반환
        return this.http.post(this.baseUrl + `/chat/add`, formdata);
    }



    // 질문을 서버에 전송하는 함수
    ask(question: string, history: Array<string>, company: string) {
        // HTTP POST 요청을 보내고 질문, 채팅 기록, 회사 정보를 포함
        return this.http.post(this.baseUrl + `/chat`, { question, history, company });
    }

}
