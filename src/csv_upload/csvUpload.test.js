import * as csv from './csvUpload'
import { Address } from '../parties/Children/address'
import {Charge, Code, Comment, Link, Reference} from '../children/index'

describe('csvUpload', () => {
  it('should convert csv string to json', () =>{
  //test csv string
  const testParams = {
      csvString: 'partyId,addresses,links,assetManagerId,comments,description,codes'
      +'\n'+'A1UNKOYGGR,{personal:{lineOne:abc,lineTwo:linetwotest,active:true},business:{lineOne:def,active:false,addressPrimary:true},legel:{lineOne:def,active:false}},{link_1:[{linkedId:1,active:true,createdBy:testCreatedBy},{linkedId:2,active:false,createdTime:testTime}],link_2:[{linkedId:1,active:false}]},1234,{commentType:{commentValue:testComment,active:true,updatedBy:dgfdsf,createdTime:05-06-2017,version:1}},testDescription,{codeType:{codeValue:testValue,active:false,createdBy:testCreated,updatedBy:testUpdated,createdTime:06-06-2017,updatedTime:06-06-2017,version:1}}'
      +'\n'+'A1UNKOYGGR,{personal:{lineOne:abc,lineTwo:linetwotest,active:true},business:{lineOne:def,active:false,city:Singapore},legel:{lineOne:def,active:false,city:Singapore}},{link_1:[{linkedId:1,active:true},{linkedId:2,active:false}],link_2:[{linkedId:1,active:false}]},1234,{commentType:{commentValue:testComment,active:true,updatedBy:dgfdsf,createdTime:05-06-2017,version:1}},testDescription,{codeType:{codeValue:testValue,active:false,createdBy:testCreated,updatedBy:testUpdated,createdTime:06-06-2017,updatedTime:06-06-2017,version:1}}'

  }

 const datatest=[{
                "addresses": 
                       {"business": {"active": false, "addressPrimary": true, "city": undefined, "countryId": undefined, "createdBy": "TEMP", "createdTime": undefined, "lineOne": "def", "lineTwo": undefined, "postalCode": undefined, "region": undefined, "updatedBy": "TEMP", "updatedTime": undefined, "version": 1}, 
                        "legel": {"active": false, "addressPrimary": false, "city": undefined, "countryId": undefined, "createdBy": "TEMP", "createdTime": undefined, "lineOne": "def", "lineTwo": undefined, "postalCode": undefined, "region": undefined, "updatedBy": "TEMP", "updatedTime": undefined, "version": 1}, 
                        "personal": {"active": true, "addressPrimary": false, "city": undefined, "countryId": undefined, "createdBy": "TEMP", "createdTime": undefined, "lineOne": "abc", "lineTwo": "linetwotest", "postalCode": undefined, "region": undefined, "updatedBy": "TEMP", "updatedTime": undefined, "version": 1}
                      }, 
                  "assetManagerId": 1234, 
                  "links": {"link_1": //By default: "createdBy": "TEMP", "updatedBy": "TEMP"
                                   [{"active": true,  "createdBy": "testCreatedBy",  "createdTime": undefined,  "linkedId": 1, "updatedBy": "TEMP",  "updatedTime": undefined, "version": 1}, {"active": false, "createdBy": "TEMP",  "createdTime": "testTime",  "linkedId": 2, "updatedBy": "TEMP",  "updatedTime": undefined, "version": 1}], 
                            "link_2": [{"active": false, "createdBy": "TEMP",  "createdTime": undefined,  "linkedId": 1, "updatedBy": "TEMP",  "updatedTime": undefined, "version": 1}]
                           }, 
                  "partyId": "A1UNKOYGGR",
                  "comments":{"commentType": {"commentValue": "testComment", "active": true, "createdBy": "TEMP", "updatedBy": "dgfdsf", "createdTime": "05-06-2017", "updatedTime": undefined, "version": 1}},
                  "description": "testDescription",
                  "codes":{"codeType": {"codeValue": "testValue", "active": false,"createdBy": "testCreated", "updatedBy": "testUpdated", "createdTime": "06-06-2017", "updatedTime": "06-06-2017", version:1}}
                }, 
                {
                "addresses": 
                     {"business": {"active": false, "addressPrimary": false, "city": "Singapore", "countryId": undefined, "createdBy": "TEMP", "createdTime": undefined, "lineOne": "def", "lineTwo": undefined, "postalCode": undefined, "region": undefined, "updatedBy": "TEMP", "updatedTime": undefined, "version": 1}, 
                      "legel": {"active": false, "addressPrimary": false, "city": "Singapore", "countryId": undefined, "createdBy": "TEMP", "createdTime": undefined, "lineOne": "def", "lineTwo": undefined, "postalCode": undefined, "region": undefined, "updatedBy": "TEMP", "updatedTime": undefined, "version": 1},
                      "personal": {"active": true, "addressPrimary": false, "city": undefined, "countryId": undefined, "createdBy": "TEMP", "createdTime": undefined, "lineOne": "abc", "lineTwo": "linetwotest", "postalCode": undefined, "region": undefined, "updatedBy": "TEMP", "updatedTime": undefined, "version": 1}
                      }, 
                "assetManagerId": 1234,
                "links": {"link_1": 
                                   [{"active": true,  "createdBy": "TEMP",  "createdTime": undefined,  "linkedId": 1, "updatedBy": "TEMP",  "updatedTime": undefined, "version": 1}, {"active": false, "createdBy": "TEMP",  "createdTime": undefined,  "linkedId": 2, "updatedBy": "TEMP",  "updatedTime": undefined, "version": 1}], 
                            "link_2": [{"active": false, "createdBy": "TEMP",  "createdTime": undefined,  "linkedId": 1, "updatedBy": "TEMP",  "updatedTime": undefined, "version": 1}]
                           }, 
                 "partyId": "A1UNKOYGGR",
                 "comments":{"commentType": {"commentValue": "testComment", "active": true, "createdBy": "TEMP", "updatedBy": "dgfdsf", "createdTime": "05-06-2017", "updatedTime": undefined, "version": 1}},
                 "description": "testDescription",
                 "codes":{"codeType": {"codeValue": "testValue", "active": false,"createdBy": "testCreated", "updatedBy": "testUpdated", "createdTime": "06-06-2017", "updatedTime": "06-06-2017", version:1}}
                 }]
  
  //test address
  const p1={
      addressString: 'address'
            +'\n'+'{personal:{line_one:abc,active:true},business:{line_one:def,active:false},legel:{line_one:def,active:false}}'
   }

   const data1={
     
            personal: {
                       line_one: "abc",
                       active: true
                     },
            business: {
                      line_one: "def",
                      active: false
                    },
            legel: {
              line_one: "def",
              active:false
            }
   }
   
  //test links
  const p2={
      linkString: 'link'
            +'\n'+'{link_1:[{linkedId:1,active:true},{linkedId:2,active:false}],link_2:[{linkedId:1,active:false}]}'
   } 
   const data2={
    
       link_1:
             [
               {linkedId: 1,
               active: true
               },
               {
                 linkedId: 2,
                 active: false
               }
             ], 
        link_2:
              [
               {linkedId: 1,
               active: false
               }
              ]
    }

    const p3={
     csv: 'description,emails.com1.active,emails.com1.version,emails.com2.active,closeTime'
      +'\n'+'RRN4WVXI1F3YA1IGMKZF,true,2,false,18:00:00'
      +'\n'+'RRN4WVXI1F3YA1IGMKZF,true,1,false,18:00:00'
  }

  const data3=[{
      description: "RRN4WVXI1F3YA1IGMKZF",
      comments:{
          com1:{
              createdBy: "TEMP",
              updatedBy: "TEMP",
              createdTime: undefined,
              updatedTime: undefined,
              version: 2,
              commentValue: undefined,
              active: true     
          },
          com2:{
              createdBy: "TEMP",
              updatedBy: "TEMP",
              createdTime: undefined,
              updatedTime: undefined,
              version: 1,
              commentValue: undefined,
              active: false
          }
      },
      closeTime: "18:00:00"
  },
  {
      description: "RRN4WVXI1F3YA1IGMKZF",
      comments:{
          com1:{
              createdBy: "TEMP",
              updatedBy: "TEMP",
              createdTime: undefined,
              updatedTime: undefined,
              version: 1,
              commentValue: undefined,
              active: true     
          },
          com2:{
              createdBy: "TEMP",
              updatedBy: "TEMP",
              createdTime: undefined,
              updatedTime: undefined,
              version: 1,
              commentValue: undefined,
              active: false
          }
      },
      closeTime: "18:00:00"
  }
  ]
    
  const p4={
     csv: 'description,links.link1[0].linked_id,links.link1[0].active,links.link1[1].linkedId,links.link1[1].active,links.link2[0].linkedId,links.link2[0].active,closeTime'
      +'\n'+'RRN4WVXI1F3YA1IGMKZF,1,true,2,false,1,false,18:00:00'
      +'\n'+'RRN4WVXI1F3YA1IGMKZF,1,true,2,false,1,false,18:00:00'
      +'\n'+',1,true,,,1,false,'
  }

 const data4=[
   {
      description: "RRN4WVXI1F3YA1IGMKZF",
      links:{
          link1:[{
              active: true,
              createdBy: "TEMP",
              createdTime: undefined,
              linkedId:  1,
              updatedBy: "TEMP",
              updatedTime: undefined,
              version: 1
          },
          {
              active: false,
              createdBy: "TEMP",
              createdTime: undefined,
              linkedId:  2,
              updatedBy: "TEMP",
              updatedTime: undefined,
              version: 1
          }],
          link2:[{
              active: false,
              createdBy: "TEMP",
              createdTime: undefined,
              linkedId:  1,
              updatedBy: "TEMP",
              updatedTime: undefined,
              version: 1
          }]
      },
      closeTime: "18:00:00"
  },
  {
      description: "RRN4WVXI1F3YA1IGMKZF",
      links:{
          link1:[{
              active: true,
              createdBy: "TEMP",
              createdTime: undefined,
              linkedId:  1,
              updatedBy: "TEMP",
              updatedTime: undefined,
              version: 1
          },
          {
              active: false,
              createdBy: "TEMP",
              createdTime: undefined,
              linkedId:  2,
              updatedBy: "TEMP",
              updatedTime: undefined,
              version: 1
          }],
          link2:[{
              active: false,
              createdBy: "TEMP",
              createdTime: undefined,
              linkedId:  1,
              updatedBy: "TEMP",
              updatedTime: undefined,
              version: 1
          }]
      },
      closeTime: "18:00:00"
  },
  {
    description: undefined,
      links:{
          link1:[{
              active: true,
              createdBy: "TEMP",
              createdTime: undefined,
              linkedId:  1,
              updatedBy: "TEMP",
              updatedTime: undefined,
              version: 1
          }],
          link2:[{
              active: false,
              createdBy: "TEMP",
              createdTime: undefined,
              linkedId:  1,
              updatedBy: "TEMP",
              updatedTime: undefined,
              version: 1
          }]
      },
      closeTime: undefined
  }

 ]
     //expect(csv.parseCsv(testParams)).toEqual(datatest);
     expect(csv.parseString(p3)).toEqual(data3);
  })
})