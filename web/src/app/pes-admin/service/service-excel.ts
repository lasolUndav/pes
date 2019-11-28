import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

import { Injectable } from '@angular/core'
import { getLocaleDateFormat } from '@angular/common'

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
const EXCEL_EXTENSION = '.xlsx'

@Injectable({
  providedIn: 'root',
})
export class ServiceExcel {
  constructor() {}

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json)
    console.log('worksheet', worksheet)
    const workbook: XLSX.WorkBook = {
      Sheets: { Transacciones: worksheet },
      SheetNames: ['Transacciones'],
    }

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName)
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    let date = new Date()
    let dateformat = require('dateformat')

    const Transacciones: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    })
    FileSaver.saveAs(
      Transacciones,
      fileName + dateformat(date, 'dd-mm-yyyy') + EXCEL_EXTENSION
    )
  }
}
