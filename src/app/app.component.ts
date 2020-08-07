import { Component, OnInit } from '@angular/core';
import { Bean } from 'src/bean';
import { element } from 'protractor';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'mindmap';
  message:string;
  queue:any[];
  element:any;
  root:Bean;
  rootElement:boolean=false;
  isRoot:boolean=false;
  isLeft:boolean=false;
  isRight:boolean=false;
  currentNode:Bean;
  inputnode:string;
  treeDone:boolean=false;
  tree:string[][];
  neighbours:String[]
  nodes:string[];

  ngOnInit(){
    this.message="Enter root element :";
    this.isRoot=true;
    this.queue=[];
    this.nodes=[];
    this.neighbours=[];
  }
  
  addElement(){
    if(this.inputnode===''){
      alert('Reload the app to start building a tree')
    }else{
    this.element= this.createNode(this.inputnode);
    this.root=this.element;
    this.root.parent=null;
    this.inputnode='';
    this.currentNode=this.element;
    this.nodes.push(this.currentNode.value);
    this.isRoot=false;
    this.createLeftChild();
    }
  }

  createNode(value:string){
    return new Bean(value);
  }

  createLeftChild(){
    this.message=`Enter left child for  ${this.currentNode.value}`;
    this.isLeft=true;

  }
  createLeft(){
    let left;
    if(this.nodes.indexOf(this.inputnode)>-1){
      alert(`${this.inputnode} already exists`);
      this.inputnode="";
      this.createLeftChild();
      return;
    }
    if(this.inputnode===''){
      left=null;
    }else{
      left=this.createNode(this.inputnode);
      left.parent=this.currentNode;
    }
    this.currentNode.left=left;
    if(left!==null){
      this.queue.push(left);
      this.nodes.push(left.value)
    }
    this.inputnode='';
    this.isLeft=false;
    this.createRightChild();
  }

  createRightChild(){
    this.isRight=true;
    this.message=`Enter right child for  ${this.currentNode.value}`;
  }
  createRight(){
    if(this.nodes.indexOf(this.inputnode)>-1){
      alert(`${this.inputnode} already exists`);
      this.inputnode="";
      this.createRightChild();
      return;
    }
    let right;
    if(this.inputnode===''){
      right=null;
    }else{
      right=this.createNode(this.inputnode);
      right.parent=this.currentNode;
    }
    if(right!==null){
      this.nodes.push(right.value);
      this.queue.push(right);
    }
    this.currentNode.right=right;
    this.inputnode='';
    this.isRight=false;
    if(this.queue.length!==0){
      this.currentNode=this.queue.shift();
      this.createLeftChild();
    }else{
      this.tree=this.printTree(this.root);
      this.treeDone=true;
    }
  }

  printTree(root){
    let findHeight=function(node){
      if(!node) return 0;
      return 1+Math.max(findHeight(node.left),findHeight(node.right))
    }
    let max=findHeight(root);
    let length=Math.pow(2,max)-1;
    let result=[];
    for(let i=0;i<max;i++){
      let row=new Array(length).fill("");
      result[i]=row;
    }
    let dfs=function(node,row,x,y){
      if(!node) return;
      let mid=Math.floor((x+y)/2);
      result[row][mid]=node
      dfs(node.left,row+1,x,mid-1);
      dfs(node.right,row+1,mid+1,y);
    }
    dfs(root,0,0,length);
    return result;
  }

  neighbor(node:Bean){
    this.neighbours=[]
    if(node.left && node.left.value){
      this.neighbours.push(node.left.value);
    }
    if(node.right && node.right.value){
      this.neighbours.push(node.right.value);
    }
    if(node.parent && node.parent.value){
      this.neighbours.push(node.parent.value);
    }
  }
}
