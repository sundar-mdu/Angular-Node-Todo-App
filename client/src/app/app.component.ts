import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todoList: any = []

  todoName: String;

  constructor(
    private service: TodoService
  ){}

  ngOnInit():void{
    this.getTodo()
  }

  getTodo(){
    this.service.getTodo('')
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
    this.service.createTodo('', newTodo)
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
    this.service.updateTodo('/'+id, updatedTodo)
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
    this.service.deleteTodo('/'+id)
    .subscribe(res=>{
      console.log('res',res);
      this.todoList.forEach((element,index)=>{
        if(element._id==id) this.todoList.splice(index,1);
      });
    },err=>{
      console.log('err', err['message']);
    })
  }
}
