import { validateFile } from '../FileValidator';
import {
  mockZipFile,
  mockDicomFile,
  mockE2EFile,
  mockH5File,
  mockInvalidFile,
} from 'Testing/MockFiles';

describe('[CO_1006] [UN_1006_0000] File validator', () => {
  it('should validate a valid zip file with the .zip extension', async () => {
    const file = mockZipFile('hello.zip');
    const valid = await validateFile(file);
    expect(valid).toBeTruthy();
  });

  it('should validate a valid zip file and add the .zip extension when it is missing', async () => {
    const file = mockZipFile('hello');
    const valid = await validateFile(file);
    expect(valid).toBeTruthy();
    expect(valid.name).toContain('.zip');
  });

  it('should validate a valid dicom file with the .dcm extension', async () => {
    const file = mockDicomFile('hello.dcm');
    const valid = await validateFile(file);
    expect(valid).toBeTruthy();
  });

  it('should validate a valid dicom file and add the .dcm extension when it is missing', async () => {
    const file = mockDicomFile('hello');
    const valid = await validateFile(file);
    expect(valid).toBeTruthy();
    expect(valid.name).toContain('.dcm');
  });

  it('should validate a valid e2e file with the .e2e extension', async () => {
    const file = mockE2EFile('hello.e2e');
    const valid = await validateFile(file);
    expect(valid).toBeTruthy();
  });

  it('should validate a valid e2e file and add the .e2e extension when it is missing', async () => {
    const file = mockE2EFile('hello');
    const valid = await validateFile(file);
    expect(valid).toBeTruthy();
    expect(valid.name).toContain('.e2e');
  });

  it('should validate a valid h5 file with the .h5 extension', async () => {
    const file = mockH5File('hello.h5');
    const valid = await validateFile(file);
    expect(valid).toBeTruthy();
  });

  it('should validate a valid h5 file and add the .h5 extension when it is missing', async () => {
    const file = mockH5File('hello');
    const valid = await validateFile(file);
    expect(valid).toBeTruthy();
    expect(valid.name).toContain('.h5');
  });

  it('should not validate an invalid file, even if it has a valid extension', async () => {
    const file = mockInvalidFile('hello.zip');
    const valid = await validateFile(file);
    expect(valid).toBeFalsy();
  });
});
