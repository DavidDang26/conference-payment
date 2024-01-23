export const errorLog = (err: any, context?: any, message?: string) => {
  console.error(err, context, message);
};

export const infoLog = (data: any, message?: string) => {
  console.info(data, message);
};
