"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsHandler = void 0;
class ContactsHandler {
    constructor(_contactsRepository) {
        this._contactsRepository = _contactsRepository;
    }
    getAllContacts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._contactsRepository.getAllContacts();
                res.json({
                    message: "OK",
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getContactById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params);
                const result = yield this._contactsRepository.getContactById(req.params.id);
                res.json({
                    message: "OK",
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    createContact(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id: id } = yield this._contactsRepository.createContact(req.body);
                res.json({
                    message: "OK",
                    data: { id }
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteContactById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._contactsRepository.deleteContactById(req.params.id);
                res.json({
                    message: "OK",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateContact(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._contactsRepository.updateContact(req.params.id, req.body);
                res.json({
                    message: "OK",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ContactsHandler = ContactsHandler;
