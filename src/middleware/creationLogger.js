const creationLogger = (req, res, next) => {
  res.on('finish', () => {
    if (req.method === 'POST' && res.statusCode >= 200 && res.statusCode < 300) {
      const timestamp = new Date().toISOString();
      const userId = req.session?.userId || 'Unauthenticated/Anonymous';
      
      console.log(`\n=================== SUCCESSFUL POST LOG ===================`);
      console.log(`[${timestamp}] Successful data creation detected!`);
      console.log(`Path: ${req.originalUrl}`);
      console.log(`Created By User ID: ${userId}`);
      console.log(`===========================================================\n`);
    }
  });

  next();
};

export default creationLogger;