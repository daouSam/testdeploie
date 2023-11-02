import { Injectable } from '@angular/core';
declare var tinymce: any;
@Injectable({
  providedIn: 'root'
})
export class TinymceService {

  constructor() { }
  private editor: any;
  private editor1: any;

  initializeEditor(selector: string) {
    this.editor = tinymce.init({
      selector: selector,
      plugins: 'autolink lists link',
      toolbar: 'undo redo | styleselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | link | bullist numlist outdent indent | removeformat | subscript superscript | forecolor backcolor | fontsizeselect | code',
      height: 300,
      content_style: 'body { font-family: Arial, sans-serif; text-align: justify; }'
    });
  }
  initializeEditor1(selector: string) {
    this.editor = tinymce.init({
      selector: selector,
      plugins: 'autolink lists link',
      toolbar: 'undo redo | styleselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | link | bullist numlist outdent indent | removeformat | subscript superscript | forecolor backcolor | fontsizeselect | code',
      height: 300,
      content_style: 'body { font-family: Arial, sans-serif; text-align: justify; }'
    });
  }

  destroyEditor() {
    if (this.editor) {
      // this.editor.destroy();
      this.editor = null;
    }
  }
  destroyEditor1() {
    if (this.editor1) {
      // this.editor.destroy();
      this.editor1 = null;
    }
  }
}
