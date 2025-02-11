export const uploadFile = async (
  formData: FormData,
  fileType: string,
  inputFieldName: string,
) => {
  const file = formData.get(inputFieldName) as File;

  if (file.name !== 'undefined') {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return {
      file: {
        name: file.name,
        data: buffer.toString('base64'),
        contentType: fileType,
      },
    };
  }
  return null;
};
