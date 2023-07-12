import { Component } from '@angular/core';
import { ProductoServicio } from '../modelo/producto-servicio';
import { productoService } from '../service/producto.service';
import { CategoriaService } from '../service/categoria.service';
import { TipoService } from '../service/tipo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Categoria } from '../modelo/categoria';
import { Tipo } from '../modelo/tipo';
import { UploadFileService } from '../service/uploadFile.service';
import { Observable } from 'rxjs';
import { FileModel } from '../modelo/fileModel';
import { ImgProducto } from '../modelo/imgProducto';
import { ImgProductoService } from '../service/imgProducto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  accion: string = "";
  tipos: Tipo[] = [];
  categorias: Categoria[] = [];
  producto: ProductoServicio = new ProductoServicio();
  categoria: Categoria = new Categoria();
  tipo: Tipo = new Tipo();
  tipoSelect: Tipo = new Tipo;
  categoriaSelect: Categoria = new Categoria;

  constructor(private productoService: productoService, private categoriaService: CategoriaService,
    private tipoService: TipoService, private fileService: UploadFileService,
    private router: Router, private toastr: ToastrService, private imgProductoService: ImgProductoService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarAccion()
    this.cargarTipos()
    this.cargarCategorias()
  }

  cargarAccion(): void {
    this.activatedRoute.params.subscribe(params => {
      this.accion = params['accion']
      console.log(this.accion)
      if (this.accion === 'editar') {
        this.cargarProd();
      }
    })
  }

  cargarProd(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.productoService.buscarId(id).subscribe((prod) => {
          this.producto = prod
          this.tipoSelect = prod.tipId
          this.categoriaSelect = prod.catId
          // console.log("rol= " + this.rolSelect.rolNombre)
        })
      }
    })
  }


  cargarTipos(): void {

    let tipoSELEC: Tipo = new Tipo()
    tipoSELEC.tipId = 0;
    tipoSELEC.tipNombre = 'Seleccione una categoria';
    this.tipos.push(tipoSELEC);
    this.tipoService.getTipos().subscribe(
      tiposArray => {
        for (let tipo of tiposArray) {
          this.tipos.push(tipo)
        }
      }
    );
  }

  cargarCategorias(): void {

    let categotiaSELEC: Categoria = new Categoria()
    categotiaSELEC.catId = 0;
    categotiaSELEC.catNombre = 'Seleccione una categoria';
    this.categorias.push(categotiaSELEC);
    this.categoriaService.getCategoria().subscribe(
      categoriaArray => {
        for (let categoria of categoriaArray) {
          this.categorias.push(categoria)
        }
      }
    );
  }

  ////////////////////IMAGENES///////////////////////////////////
  selectedFiles: File[] = [];
  filePreviews: string[] = [];

  onFileChange(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    this.filePreviews = [];
    console.log("select= " + this.selectedFiles.length)

    for (const file of this.selectedFiles) {
      this.getPreviewUrl(file).then((previewUrl) => {
        this.filePreviews.push(previewUrl);
        console.log("PREVIEW= " + this.filePreviews.length)

      });
    }
  }

  getPreviewUrl(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        resolve(e.target.result);
      };

      reader.onerror = (e) => {
        reject(e);
      };

      reader.readAsDataURL(file);
    });
  }

  uploadFiles(): void {
    this.fileService.uploadFiles(this.selectedFiles).subscribe(
      (response: FileModel[]) => {
        console.log('Archivos subidos correctamente:', response);
        // Realiza las operaciones necesarias con los archivos subidos
        // ...
      },
      (error: any) => {
        console.error('Error al subir los archivos:', error);
        // Maneja el error adecuadamente
        // ...
      }
    );
  }

  registrar(): void {
    this.producto.prodEstado = 1;
    this.tipo.tipNombre = this.tipoSelect.tipNombre;

    for (const tip of this.tipos) {
      if (this.tipo.tipNombre === tip.tipNombre) {
        this.producto.tipId = tip;
        break;
      }
    }

    this.categoria.catNombre = this.categoriaSelect.catNombre;

    for (const cat of this.categorias) {
      if (this.categoria.catNombre === cat.catNombre) {
        this.producto.catId = cat;
        break;
      }
    }

    let imgProducto: ImgProducto[] = [];
    this.productoService.crearProducto(this.producto).subscribe(
      productonew => {


        this.fileService.uploadFiles(this.selectedFiles).subscribe(
          (response: FileModel[]) => {


            for (let file of response) {
              let prod: ImgProducto = new ImgProducto();
              prod.imgProdNombre = file.name;
              // prod.imgProdUrl = file.url;

              this.fileService.getFileName(prod.imgProdNombre).subscribe(fileName => {
                prod.imgProdUrl = fileName.url;
                prod.prodId = productonew;
                console.log("idprod= " + prod.prodId.prodId);
                console.log("nombre= " + prod.imgProdNombre);
                console.log("URL= " + prod.imgProdUrl);
                imgProducto.push(prod)
                console.log("=============================")
                this.imgProductoService.agregarIMG(prod).subscribe(img => {
                  console.log("idprod= " + img?.prodId?.prodId);
                  console.log("nombre= " + img?.imgProdNombre);
                  console.log("URL= " + img?.imgProdUrl);
                });
              });


              // this.imgProductoService.agregarIMG(prod).subscribe(img => {

              // });

            }
            for (let file of response) {


            }

            console.log('Archivos subidos correctamente:', response);

            // Realiza las operaciones necesarias con los archivos subidos
            // ...
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registro exitoso',
              showConfirmButton: true
            }).then(() => {
              location.reload();
            });
          },
          (error: any) => {
            console.error('Error al subir los archivos:', error);
            // Maneja el error adecuadamente
            // ...
          }
        );
      });
  };



  // registrar(): void {

  //   this.tipo.tipNombre = this.seleccionados.tipNombre;

  //   for (const tip of this.tipos) {
  //     if (this.tipo.tipNombre === tip.tipNombre) {
  //       this.producto.tipId = tip;
  //       break;
  //     }
  //   }
  //   this.productoService.crearProducto(this.producto).subscribe(
  //     response => {
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'success',
  //         title: 'Registro exitoso',
  //         showConfirmButton: true
  //       }).then(() => {
  //         location.reload();
  //       });
  //     });
  // };
};
