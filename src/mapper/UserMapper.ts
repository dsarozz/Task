export class UserMapper {

    async DTOtoModel(dto: any) {

        if (dto) {
            var model: any = {};
            model.id = dto.id || null;
            model.username = dto.username;
            model.password = dto.password;

        }
        return model;
    }
}