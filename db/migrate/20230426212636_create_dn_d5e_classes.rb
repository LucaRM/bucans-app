class CreateDnD5eClasses < ActiveRecord::Migration[7.0]
  def change
    create_table :dn_d5e_classes do |t|
      t.string :title
      t.text :body

      t.timestamps
    end
  end
end
