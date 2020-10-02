export declare abstract class BaseEntity<T> {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<T>);
}
