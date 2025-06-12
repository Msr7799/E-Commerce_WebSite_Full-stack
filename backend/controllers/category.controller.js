import Category from '../models/category.model.js';
import cloudinary from '../lib/cloudinary.js';

export const createCategory = async (req, res) => {
  try {
    const { name, description, image, href } = req.body;

    let imageUrl = '';
    if (image) {
      const cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: 'categories'
      });
      imageUrl = cloudinaryResponse.secure_url;
    }

    const category = await Category.create({
      name,
      description,
      imageUrl,
      href: href.toLowerCase()
    });

    res.status(201).json(category);
  } catch (error) {
    console.log('Error in createCategory controller', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.log('Error in getAllCategories controller', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, description, image, href, isActive } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (image) {
      const cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: 'categories'
      });
      category.imageUrl = cloudinaryResponse.secure_url;
    }

    category.name = name || category.name;
    category.description = description || category.description;
    category.href = href?.toLowerCase() || category.href;
    category.isActive = isActive ?? category.isActive;

    await category.save();
    res.json(category);
  } catch (error) {
    console.log('Error in updateCategory controller', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (category.imageUrl) {
      const publicId = category.imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`categories/${publicId}`);
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.log('Error in deleteCategory controller', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
