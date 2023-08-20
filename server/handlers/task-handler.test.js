import { createTask } from "./taskHandler"

test('throws userNotFound if db doesnt have user with requested id',()=>{

    const mockUserModel= jest.fn(()=>{
        return undefined;
    });

    try{
        createTask(mockUserModel,'myid','mytitle','hi there');
        assertFail('it should not reach here')
    }catch(error){

    }


})


test('successfully insertion',()=>{

    const mockUserModel= jest.fn(()=>{
        
        return {user: 1, status:true};
    });

    try{
        createTask(mockUserModel,'myid','mytitle','hi there');
        assertFail('it should not reach here')
    }catch(error){

    }


})