export class Bean{
    value:string;
    left:Bean;
    right:Bean;
    parent:Bean;

    constructor(value:string)
    {  
        this.value=value;
    }
}