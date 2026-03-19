import { createContext } from "react";
import IRoute from "../model/IRoute";

interface IAppContext {
    navigate: (route:IRoute) => void,
}

const initValue:IAppContext ={
    navigate: _ => {throw "navigate() is not imp..."}
}

const AppContext = createContext<IAppContext>(initValue);

export {AppContext}