import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Types } from 'mongoose';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: '작성한 고양이 ID',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: '댓글 컨텐츠',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
  })
  @Prop({ default: 0 })
  @IsPositive()
  @IsNotEmpty()
  likeCount: number;

  @ApiProperty({
    description: '작성 대상 (게시물,정보글)',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  profile: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
