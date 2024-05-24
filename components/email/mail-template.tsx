interface MailTemplateProps {
  name: string;
  message: string;
}

export const MailTemplate = ({ name, message }: MailTemplateProps) => {
  return (
    <div>
      <h1>Hi {name}</h1>
      <p>{message}</p>
    </div>
  );
};
