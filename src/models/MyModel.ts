import { Document, FilterQuery, Model, model, Schema } from "mongoose";

/**
 * Mongoose Schema 
 */
const myModelSchema = new Schema({
	stringField: { type: String, required: true, unique: true },
	booleanField: { type: Boolean },
	numberField: { type: Number, required: true, min: 0.0 },
	arrayField: [String]
});

/**
 * Interface to type the data of a MyModel instance
 */
interface MyModelDoc extends Document {
	stringField: string;
	booleanField: boolean;
	numberField: number;
	arrayField: [string];
}

/**
 * Interface to type the data for creating a MyModel instance
 */
interface IMyModel {
	stringField: string;
	booleanField: boolean;
	numberField: number;
	arrayField: [string];
}

interface MyModelInterface extends Model<MyModelDoc> {
	build(data: IMyModel): MyModelDoc
}

/**
 * Function: build(data)
 * To create a new instance of MyModel
 */
myModelSchema.statics.build = (data: IMyModel) => {
	return new MyModel(data);
};

/**
 * Function: listBy(filter, skip, limit, sort)
 * To list the instances of MyModel by filter
 */
myModelSchema.statics.listBy = (filter: FilterQuery<any>, skip: number, limit: number, sort: string) => {
	const query = MyModel.find(filter);
	query.skip(skip);
	query.limit(limit);
	query.collation({ locale: 'en' }).sort(sort);
	return query.exec();
};


const MyModel = model<MyModelDoc, MyModelInterface>('MyModel', myModelSchema);

export default { MyModel };
