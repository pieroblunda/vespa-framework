// import Log from '../models/log.server.model.js';

export function getPartnerInfo(req, res, next) {
  
  if(!res.middleware) {
    res.middleware = {
      partnerData: {}
    };
  }
  
  res.middleware.partnerData.code = process.env.PARTNER_CODE;
  
  next();
  
}
