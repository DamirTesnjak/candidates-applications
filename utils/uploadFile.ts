export const uploadFile = async (
  formData: FormData,
  inputFieldName: string,
) => {
  console.log('inputFieldName', inputFieldName);
  console.log('formData', formData);
  const file = formData.get(inputFieldName) as File;
  console.log('file', file);

  console.log('file.name', file.name);

  if ( file && file.name !== 'undefined') {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return {
      file: {
        name: file.name,
        data: buffer.toString('base64'),
        contentType: file.type,
      },
    };
  }
  return null;
};
