import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class HierarchyDemoService {

  constructor(private http: Http) {}

  public getLeafTemplate(): Observable<any> {
    return this.http.get('./app/hierarchy/hierarchy.demo.json')
    .map((res: any) => res.json())
    .catch(error => this.handleError(error));
  }

  private handleError(error: Response) {
    return Observable.throw(error || 'Server error');
  }
}
