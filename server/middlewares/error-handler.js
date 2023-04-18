'use strict';

export default function(error, req, res, next) {
  console.log('errorHandler');
  return res.status(500).json({
    error: error.toString()
  });
}
