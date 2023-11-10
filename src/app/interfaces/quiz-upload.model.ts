export interface QuizUpload {
  recaptcha_response: string;
  name: string;
  dob: string;
  place_of_residence: string;
  already_participated_description?: string;
  already_participated: '0' | '1';
  phone: string;
  email: string;
  occupation: string;
  agreed_to_audition_rules: string;
  agreed_with_the_processing_of_personal_data: string;
}
