namespace Express {
  export interface Request {
    filtered: {
      id?: string
      user_name?: string
      password?: string
      user_number?: string
      user_mail?: string
      user_surname?: string
      user_was_born?: string
      user_s?: string
      user_img?: string
      title?: string
      category_id?: string
      sub_category_id?: string
      sub_sub_id?: string
      price?: string
      comment?: string
      brand?: string
      size?: string
      netto?: string
      author?: string
      description?: string
      color?: string
      made_in?: string
      discount?: number
      img?: string
      img1?: string
      img2?: string
      img3?: string
      img4?: string
      ProductId?: string
      userId?: string
      commentary: string
      star?: number | undefined
      discont_price?: string
      count?: number
    }
  }
}
