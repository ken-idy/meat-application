import { Observable } from 'rxjs/Observable';

import {Response} from '@angular/http'

export class ErroHandler {
    static handError(error: Response | any){
        let errorMessage: string
        if(error instanceof Response){
            errorMessage =`Erro ${error.status} ao obter a URL ${error.url} - ${error.statusText}`
        }else{
            errorMessage = error.toString()
        }
        console.log(errorMessage)
        return Observable.throw(errorMessage)
    }
}