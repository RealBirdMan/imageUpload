import { IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class FileResponse {
  @Field()
  @IsString()
  url: string;

  @Field()
  @IsString()
  bytes: string;

  @Field()
  @IsString()
  format: string;
}
