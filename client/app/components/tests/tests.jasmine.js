// import {describe, expect, it} from '@angular/core/testing';
// import {describe, expect, it, xit, inject, beforeEachProviders} from '@angular/core/testing';
// import {FormComponent} from '../form/form.component';
// import {SocketService} from '../socket/socket.service';
// import 'reflect-metadata';
// import 'zone.js/dist/zone'; 
// import 'zone.js/dist/long-stack-trace-zone';
var Form = (function () {
    function Form() {
    }
    return Form;
}());
var mockFormData = { "authUserId": "facebook|3261350703943",
    "servers": [{ "ip": "1", "port": "1", "application_type": "ws", "endpoint": "/" },
        { "ip": "1", "port": "1", "application_type": "ws", "endpoint": "/" }],
    "volume": "10" };
describe('Form', function () {
    it('has authUserId', function () {
        var form = mockFormData;
        expect(form.authUserId).toEqual('facebook|3261350703943');
    });
    it('has serverInfo', function () {
        var form = mockFormData;
        expect(form.servers).toEqual([{ "ip": "1", "port": "1", "application_type": "ws", "endpoint": "/" },
            { "ip": "1", "port": "1", "application_type": "ws", "endpoint": "/" }]);
    });
    it('has volume', function () {
        var form = mockFormData;
        expect(form.volume).toEqual('10');
    });
});
// export function main() {
//   describe('FormComponent', () => {
//      beforeEachProviders(() => [
//             FormComponent
//         ]);
//         //adding new Server IPs
//         it('add form item', inject([FormComponent], (formComponent) => {
//            formComponent.servers.push(mockFormData.servers);
//             expect(formComponent).toBe([{"ip":"1","port":"1","application_type":"ws","endpoint":"/"},
//             {"ip":"1","port":"1","application_type":"ws","endpoint":"/"}]);
//         }));
//   });
// }
//# sourceMappingURL=tests.jasmine.js.map