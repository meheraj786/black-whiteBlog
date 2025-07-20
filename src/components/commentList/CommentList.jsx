import React from "react";
import { FaUser } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";
import Flex from "../../layouts/Flex";
import { getDatabase, ref, remove } from "firebase/database";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const CommentList = ({ comment }) => {
  const user = useSelector((state) => state.user.user);
  const deleteHandler = (id) => {
    const db = getDatabase();
    remove(ref(db, "comments/" + id)).then(() => {
      toast.success("Comment Successfully Deleted");
    });
  };
  return (
    <div className="px-5">
      <Toaster position="top-right" reverseOrder={false} duration={2000} />
      <Flex className="mt-5 font-secondary">
        <Flex className="gap-x-2">
          <Link to={`/profile/${comment.commenterId}`} className="text-gray-500 text-[14px] flex items-center gap-x-1">
            {" "}
            {
                            comment.imageUrl ? <img src={comment.imageUrl} className="w-[20px] h-[20px] rounded-full" alt="" /> : <FaUser />
                          }
            {comment.name}
          </Link>
          <span className="text-gray-500 ">
            <GoDotFill size={20} />
          </span>
          <p className="text-gray-500 text-[14px] flex items-center gap-x-1">
            {" "}
            <MdOutlineDateRange size={20} />
            Published {comment.date}
          </p>
        </Flex>
        {user?.uid == comment.commenterId && (
          <button
            className="cursor-pointer"
            onClick={() => deleteHandler(comment.id)}
          >
            <RiDeleteBin6Line color="red" size={22} />
          </button>
        )}
      </Flex>
      <p className="text-[14px] mt-4 text-gray-600">{comment.comment}</p>
    </div>
  );
};

export default CommentList;
