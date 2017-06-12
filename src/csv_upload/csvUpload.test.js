import * as csv from './csvUpload'
import { Address } from '../parties/Children/address'
import {Charge, Code, Comment, Link, Reference} from '../children/index'
import {Transaction} from '../transactions/index'

describe('csvUpload', () => {
 it('should convert child headings to nested objects', () =>{

  const param2={
      csv: 'links.MyLink.0.linked_id,comments.MyComments.comment_value'
      +'\n'+'1,PAID'
      +'\n'+'2,REFUND'
      +'\n'+'3,'
      +'\n'+',PAID', 
      type: "transactions"
  }
  
  const comment1=new Comment({commentValue: "PAID"})
  var commentObject1={}
  commentObject1["MyComments"]=comment1;
  const comment2=new Comment({commentValue: "REFUND"})
  var commentObject2={}
  commentObject2["MyComments"]=comment2;

  const link1=new Link({linkedId: 1})
  var linkedObject1={}
  var linkArray1=[]
  linkArray1.push(link1)
  linkedObject1["MyLink"]=linkArray1
  const link2=new Link({linkedId: 2})
  var linkedObject2={}
  var linkArray2=[]
  linkArray2.push(link2)
  linkedObject2["MyLink"]=linkArray2
  const link3=new Link({linkedId: 3})
  var linkedObject3={}
  var linkArray3=[]
  linkArray3.push(link3)
  linkedObject3["MyLink"]=linkArray3
 
  var t1={};
  t1["links"]=linkedObject1
  t1["comments"]=commentObject1
  const transaction1=new Transaction(t1)
  var t2={};
  t2["links"]=linkedObject2
  t2["comments"]=commentObject2
  const transaction2=new Transaction(t2)
  var t3={};
  t3["links"]=linkedObject3
  const transaction3=new Transaction(t3)
  var t4={};
  t4["comments"]=commentObject1
  const transaction4=new Transaction(t4)
  
 const data2=[]
 data2.push(transaction1)
 data2.push(transaction2)
 data2.push(transaction3)
 data2.push(transaction4)

expect(csv.parseString(param2)).toEqual(data2);

})

it('should convert headings to camelCase', () => {

 const param={
      csv: 'asset_manager_id,party_id,transaction_id'
      +'\n'+'1,224,'
      +'\n'+'1,2,3'
      +'\n'+',4,5', 
      type: "transactions"
  }

  const transaction1=new Transaction({assetManagerId: 1, partyId: 224})
  const transaction2=new Transaction({assetManagerId: 1, partyId: 2, transactionId: 3})
  const transaction3=new Transaction({partyId: 4, transactionId: 5})

  const data=[]
  data.push(transaction1)
  data.push(transaction2)
  data.push(transaction3)
  expect(csv.parseString(param)).toEqual(data);

})
})