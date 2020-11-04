import jwt_decode from "jwt-decode";

const isAuthed = () => {
    const token = localStorage.getItem('token')
    try {
        if(jwt_decode(token)) {
            return true
        }
    } catch (err) {
        return false
    }
}

const datesCompare = {
    convert:function(d) {
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            // @ts-ignore
            d.constructor === Number ? new Date(d) :
            // @ts-ignore
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a: any,b: any): any {
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            // @ts-ignore
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
}

export default isAuthed
// @ts-ignore
export {datesCompare}
