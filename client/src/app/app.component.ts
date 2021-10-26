import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayService } from './services/pay.service';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todoList: any = []

  todoName: String;

  constructor(
    private todoService: TodoService,
    private payService: PayService,
    private route: ActivatedRoute,
    public router: Router
  ){}

  ngOnInit():void{
    this.route.queryParams.subscribe(params=>{
      if(params.paymentId && params.PayerID && params.token){
        console.log('token', params.token);
        this.executePay(params.PayerID, params.paymentId)
      }
    })

    this.getTodo()
  }

  getTodo(){
    this.todoService.getTodo('/todo')
    .subscribe(res=>{
      console.log('res',res);

      this.todoList = res
    },err=>{
      console.log('err', err['message']);
    })
  }

  createTodo(){
    let newTodo = {
      todoName: this.todoName,
      completed: false
    }
    this.todoService.createTodo('/todo', newTodo)
    .subscribe(res=>{
      console.log('res',res);

      this.todoList.push(res)
      this.todoName=''
    },err=>{
      console.log('err', err['message']);
    })
  }

  updateTodo(id, e){
    let updatedTodo = {
      completed: e.target.checked?true:false
    }
    this.todoService.updateTodo('/todo/'+id, updatedTodo)
    .subscribe(res=>{
      console.log('res',res);
      this.todoList.forEach((element,index)=>{
        if(element._id==id) element.completed=res['completed'];
      });
    },err=>{
      console.log('err', err['message']);
    })
  }

  deleteTodo(id){
    this.todoService.deleteTodo('/todo/'+id)
    .subscribe(res=>{
      console.log('res',res);
      this.todoList.forEach((element,index)=>{
        if(element._id==id) this.todoList.splice(index,1);
      });
    },err=>{
      console.log('err', err['message']);
    })
  }

  createPay(){
    this.payService.createPay('/pay')
    .subscribe(res=>{
      console.log('res',res);
      window.location.replace(res['resUrl']);
    },err=>{
      console.log('err', err['message']);
    })
  }

  executePay(PayerID, paymentId){
    let newPay = {
      PayerID: PayerID,
      paymentId: paymentId
    }
    this.payService.executePay('/pay', newPay)
    .subscribe(res=>{
      alert(res)
      this.router.navigate([''])
    },err=>{
      console.log('err', err['message']);
    })
  }
}
