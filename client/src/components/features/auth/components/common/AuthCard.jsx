import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AuthCard = ({ title, description, children }) => {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
};

export default AuthCard;
