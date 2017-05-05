import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy,OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Message } from 'primeng/primeng';
import { MessageService } from './core/services/index';
import * as fromRoot from './core/store/';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.page.css'],
  templateUrl: './app.page.html'
})
export class AppPage implements OnInit {
  msgs: Message[] = [];


  constructor(private store: Store<fromRoot.RootState>,private messageService: MessageService) {
    
  }
 ngOnInit() {
        this.messageService.getMessages()
            .subscribe((value: Object) => {
                this.msgs = [];
                this.msgs.push(value);
            });
    }
  
}
