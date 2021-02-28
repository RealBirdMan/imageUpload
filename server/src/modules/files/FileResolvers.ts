import { Resolver, Query, Mutation, Arg } from "type-graphql";

import { File } from "../../entity/File";
import { FileResponse } from "./fileResponse/fileResponse";

@Resolver()
export class FileResolver {
  @Query(() => [File])
  async files() {
    let file = await File.find();
    return file;
  }

  @Mutation(() => Boolean)
  async createFile(@Arg("input") { url, bytes, format }: FileResponse) {
    try {
      await File.insert({ url, bytes, format });
      return true;
    } catch (err) {
      throw new Error("An unknown error occurred");
    }
  }
}
