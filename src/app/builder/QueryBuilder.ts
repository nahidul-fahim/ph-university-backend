import { FilterQuery, Query } from "mongoose";


class QueryBuilder<T> {
    public modelQuery: Query<T[], T> // it can return an array or can return an object
    public query: Record<string, unknown>;

    // creating constructors
    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    // search method
    search(searchableFields: string[]) {
        const searchTerm = this?.query?.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' }
                }) as FilterQuery<T>)
            })
        }

        return this;
    }

    // filter method
    filter() {
        // making a copy of query object that can be mutated
        let queryObj = { ...this.query }

        // exclude field
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'] // this fields will be excluded from filtering which will do exact match
        excludeFields.forEach((el) => delete queryObj[el])

        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

        return this;
    }

    // sort method
    sort() {
        const sort = this.query.sort as string || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort as string);
        return this;
    }

    // pagination and limit method
    paginate() {
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }

    // field limiting method
    fields() {
        const fields = (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v'
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}


export default QueryBuilder;