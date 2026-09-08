import {Input} from "antd"
import { useDispatch } from "react-redux";
import { setSearch } from "../store/tasksSlice";
import type { AppDispatch } from "../store/store";

function SearchInput(){
const dispatch = useDispatch<AppDispatch>();

function search(value: string){
    dispatch(setSearch(value))

}

    return (
        <>
            <Input.Search 
            placeholder="Поиск задачи"
            onSearch={search}
            enterButton = "Найти"
            allowClear
            size="large"
            >

            </Input.Search>
        </>
    );
}


export default SearchInput;