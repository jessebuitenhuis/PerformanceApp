import * as HttpStatus from 'http-status-codes';

export function authorize(req : any, res : any, next : any) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.status(HttpStatus.UNAUTHORIZED);
}