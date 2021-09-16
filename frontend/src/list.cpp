#include <bits/stdc++.h>
#include<iostream>
using namespace std;
struct node
{
    int data;
    struct node* next;
};
typedef struct node node;
node* createnode(int data){
    node *temp=new node();
    temp->data=data;
    temp->next=NULL;
    return temp;
}
node* createlist(){
    node* head=NULL;
    node* ptr=NULL;
    node* current=NULL;
    int input;
    while(1){
    cin>>input;
    if(input==-1)
        break;
    if(head==NULL){
        head=createnode(input);
        ptr=head;
    }
    else
    {
        current=createnode(input);
        ptr->next=current;
        ptr=current;
    }
    }
    return head;
}
void printlist(node*head){
    node* ptr=head;
    while(ptr!=NULL){
        cout<<ptr->data<<" ";
        ptr=ptr->next;
    }
}
int main(){
  node* head =new node();
    head=createlist();
    printlist(head);
}