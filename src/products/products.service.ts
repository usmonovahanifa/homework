import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { DEFAULT_FACTORY_CLASS_METHOD_KEY } from '@nestjs/common/module-utils/constants';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      await this.productsRepository.create(createProductDto);
      const createdProduct = await this.productsRepository.save(createProductDto);

      return {
        success: true,
        message: "Product created successfully!",
        data: createdProduct,
        status: 201
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        status: error.status || 500
      }
    }
  }

  async findAll() {
    try {
      const products = await this.productsRepository.find();

      return {
        success: true,
        message: "All products",
        data: products,
        status: 200
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        status: error.status || 500
      }
    }
  }

  async findOne(id: number) {
    try {
      const checkProduct = await this.productsRepository.findOneBy({id});

      if(checkProduct){
        return {
          success: true,
          message: `Product with id #${id}`,
          data: checkProduct
        }
      } else {
        return {
          success: false,
          message: `Cannot find product with id #${id}`,
          status: 404
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        status: error.status || 500
      }
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const checkProduct = await this.productsRepository.findOneBy({id});

      if(!checkProduct){
        return {
          success: false,
          message: `Cannot find product with id #${id}`,
          status: 404
        }
      }

      await this.productsRepository.update(id, updateProductDto);

      return {
        success: true,
        message: "Product updated successfully!"
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        status: error.status || 500
      }
    }
  }

  async remove(id: number) {
    try {
      const checkProduct = await this.productsRepository.findOneBy({id});

      if(checkProduct){
        await this.productsRepository.delete({id});

        return {
          success: true,
          message: "Product deleted successfully!"
        }
      } else {
        return {
          success: false,
          message: `Cannot find product with id #${id}`,
          status: 404
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        status: error.status || 500
      }
    }
  }
}