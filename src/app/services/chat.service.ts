import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // 문서 등록
  addDocs(company: string, files: File[]) {
    let formdata: FormData = new FormData();
    console.log(company, files)
    for (let file of files) {

      formdata.append('files', file, file.name);
    }
    console.log(formdata)
    formdata!.append('company', company);

    return this.http.post(this.baseUrl + `/chat/add`, formdata);
  }


  // 질문
  ask(question: string) {
    return this.http.post(this.baseUrl + `/chat`, question);
  }
}
