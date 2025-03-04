import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import Link from "next/link";
import { Authority } from "../_actions/auth-action.type";

interface AuthorityCardProps {
  authority: Authority;
  index: number;
}

export function AuthorityCard({ authority, index }: AuthorityCardProps) {
  return (
    <Link href={`/authority/${authority.id}`}>
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>
            <Badge>{index}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">한국어:</span>
              <span>{authority.ko}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">
                English:
              </span>
              <span>{authority.en}</span>
            </div>
            <div className="mt-2 pt-2 border-t">
              <div className="text-xs text-muted-foreground">Permissions:</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {Object.entries(authority.roles).map(([key, roles]) => (
                  <span
                    key={key}
                    className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {key}:{roles.length}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
